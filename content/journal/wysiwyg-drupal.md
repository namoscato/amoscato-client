+++
date = "2014-05-31T19:50:19-04:00"
title = "WYSIWYG Drupal"
summary = "Recent work with Drupal prompts a technical guide on configuring CKEditor with Drupal's WYSIWYG module."
+++

I hate to blog about something technical – alright actually that's probably not true. But lately, I've been writing about things related to college, careers and whatnot, so this is going to be a bit different.

Naturally, I am in the middle of a few freelance projects. I always tell myself that I am going to scale down the number of projects I am working on, but that never seems to happen. At any rate, I have been doing a fair amount of [Drupal](https://drupal.org/) development lately, and this is now the third or fourth time I have experienced an issue configuring a WYSIWYG editor, so I thought I would briefly outline the steps I took to resolve the issue for others who might experience the same problem.

As a side note, I can't say that I am really satisfied with the WYSIWYG options for Drupal. Of course, they are all third-party open source projects, but I really think this is one of the main differentiators between other platforms such as [WordPress](https://wordpress.org/) or [Medium](https://medium.com/). But that's a conversation for another day.

With all of that said, I have found [CKEditor](http://ckeditor.com/) to be one of the best options. However, the installation and configuration process with the [WYSIWYG module](https://drupal.org/project/wysiwyg) is a bit tedious. Here is what I had to do:

1. Install the [WYSIWYG module](https://drupal.org/project/wysiwyg) and its dependencies.

2. Download a [CKEditor](http://ckeditor.com/download) package, unzip it and drop it in `/sites/all/libraries/ckeditor`.

3. You'll see that after trying to configure WYSIWYG's profile, the module has an issue determining the version of CKEditor. It turns out the module is actually applying a regular expression to `ckeditor.js` in order to extract the version. Well, the JavaScript has since changed  specifically, CKEditor started using double quotes around their object values instead of single quotes. Rather than mess with the JavaScript (after all, CKEditor didn't do anything wrong), it is necessary to modify the regular expression on line 81 of `/sites/all/modules/wysiwyg/editors/ckeditor.inc` as follows:

    ```php
    <?php // ckeditor.inc#L81
    if (preg_match('@version:"(?:CKEditor )?([\d\.]+)(?:.+revision:"([\d]+))?@', $line, $version)) {
    ```

4. Once you set CKEditor as the WYSIWYG editor on one of your text formats and enable some CKEditor buttons, you might be getting some JavaScript errors in the console as I was. The culprit: `wysiwyg.js` was being loaded before jQuery and the references were broken. Given that I was already including my JavaScript in the footer of `page.tpl.php`, the defined scope passed into [`drupal_ad_js()`](https://api.drupal.org/api/drupal/includes!common.inc/function/drupal_add_js/7) was being thrown off. This problem was resolved by removing the second scope parameter on line 416 of `/sites/all/modules/wysiwyg/wysiwyg.module`:

    ```php
    <?php // wysiwyg.module#416
    drupal_add_js($path . '/wysiwyg.js');
    ```

5. Most of the time, I set the editor CSS to Editor default CSS to avoid weird styling bugs in the WYSIWYG. However, if you are using [LESS](https://drupal.org/project/less) to preprocess your CSS, you might be getting an undefined index error in `less_wysiwyg_editor_settings_alter()`. This can be resolved by adding a quick conditional check around line 27 of `/sites/all/modules/less/less.wysiwyg.inc`:

    ```php
    <?php // less.wysiwyg.inc#25
    case 'ckeditor':
        if (isset($settings['contentsCss'])) {
          $stylesheets = $settings['contentsCss'];
        }
    ```

That seemed to do the trick for me. I am by no means suggesting that this will cure all of your problems, but hopefully it will get you started in the right direction.

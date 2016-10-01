+++
date = "2016-10-01T18:45:00-04:00"
title = "What is Testing?"
description = "A realization questions the purpose of automated testing without focusing on the bigger picture: The functional mindset that should inherently be part of the development process."
+++

I had a major realization this week: A software engineering team cannot simply rely on an automated test suite. "Substantial coverage" at every level of the testing pyramid does not directly equate to a substantial mitigation of bugs. For example, you could be asserting the validity of something that is incorrectly built. The test will pass, but the feature won't work as intended.

This is certainly a contrived example, but it illustrates my point. Too often are we sucked into this "test-writing mindset" that mindlessly asserts the validity of something based on how it was already implemented. Obviously these sorts of tests are useless, so why do we write them? Do we find comfort in maximizing the number of green dots when executing a test suite? Admittedly, I think part of me does.

Now we don't have "substantial" automated test coverage; we never will, and that's ok. But the part of "testing" that is generally not included as part of the testing pyramid is the continuous mindset that should be inherently part of the development process. How will adding this database column affect seemingly unrelated queries to this table? How will this function handle an edge case input? How will the validation constraints on this request body enforce data requirements while simplifying business logic? How will the validation on this form control prevent the user from inputting the wrong thing? How will the messaging on this interface dialog bring clarity and confidence to a user action while preventing a misguided user error?

> Fun fact: All of the above questions, when asked _during_ the development process, could have prevented a bug I fixed this week.

These questions are more important than writing an automated test because they inform how we implement a feature, and they inform what automated tests we ultimately write. Unfortunately, our automated tests are only as smart as the developer writing them. They are not going to magically fix an edge case bug in a seemingly unrelated part of the codebase. That's our job. And the best time to uncover these bugs? While we are writing or reviewing the code that introduces the bug. Go figure. And if you're lucky, you can prevent the bug before it even becomes a noticeable issue.

So what is "testing"?

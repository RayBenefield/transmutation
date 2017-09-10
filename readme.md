# transmutation

Enhanced promises for API creation, inspired by RxJS and Lodash.


## Work Log

### #18

Worked on the isolate function that makes it easy to isolate pieces of objects.
It supports a single path or multiple paths in the form of an array. It is
curried so it can be passed to things like the extend operator to do fun awesome
things.


### #17

Finished up the delayed do operator work, also added support for arrays for the
ifNo operator. And I also had time to refactor out the operators into their own
file using the wildcard plugin for babel. Lots done. Now I'm going to
potentially look into an isolate function next. Time for my break. Thing is I'm
on a plane so I'll just have to sit here for a bit.


### #16

I had to revert the last commit that I had dealing with trying to bubble up
errors, it just wasn't working out properly. I finished up adding array support
for the if operator... I guess I need to add it to the ifNo operator as well.
Well I also started work on properly waiting for the Do operator's side effect
to finish since I have a lot of side effect stuff that needs to be done in other
projects.


### #15

So I thought I solved things, but I definitely didn't. As soon as I started
adding back the other tests they all started breaking because the catch tests
were throwing errors haphazardly so now I have to figure out a solid way to
prevent that. Error handling is SUPER stressful... AHHH!!!


### #14

So I realized while using **Transmutation** that I have a problem with how errors
are handled. When I start nesting transmutations then I start swallowing errors
which is not what I want to do. I want to be able to error anywhere deep in the
chain and it needs to bubble up. In order to do that I have to figure out where
and when and how errors are being handled deeply and find a way to bubble
everything up. And this is already proving to be fairly difficult. So I hope I
don't get "trapped" in this forever. Once I figure out how to bubble errors I
will definitely then put some work into this "trap" operator concept where I'm
able to catch an error and convert it into an object instead so it can still be
handled neatly (like sending back an HTTP response). I'm kind of anxious about
this all, because error handling with promises are a very unknown bit of
territory for me so I have a lot of learning to do. Hopefully things go smoothly
tonight and I at least solve the bubbling problem. Wish me luck...


### #13

Added a new switch operator which was super simple, then got stuck on what to
work on next. So I built up my todo list first which was just transferring some
ideas I had from **Google Keep**. Then I realized that I forgot to add one of my
old operator ideas which was putting the value `under` a path. Which can totally
become useful moving forward. I did discover that if I use a conditional
operator like `if`, `ifNo`, and `switch` that I can only tie a single transducer
instead of a chain to the conditional. I think I know how to do a chain, but it
may take some thought first. Regardless, I threw on a whole bunch of operators
today and I'm quite proud of that. I'll push up my latest version and then I
might start applying it around places tomorrow. We shall see. I can probably
refactor some more things in **Rampant.AI** now.


### #12

Totally had a good run this go around as I knew exactly what to do. So first I
finished up the log operator and added some skipped tests to test out the
console logging actually. And then when I finished that I jumped straight into
the `if` and `ifNo` operators. Took me no time at all since I was able to extend
the default transmuter with the operators and use them to just make transducers
which is awesome and was SUPER easy. Way easier than I thought. I think I know
how to do meta operators that affect the whole transducer list as well... like
adding a logging statement between every transducer to inspect the stream. SUPER
useful if I can pull it off. I was super shocked at how easy `if` and `ifNo`
were. And very happy about it should make things a lot more declarative. The
next operator that I really want to tackle though is definitely a `switch`
operator since it is one of the key things that creates verbosity in **RxJS** for me
since you have merge two streams and filter both because if you don't output
from a stream it just never outputs. It is crazy painful. So hopefully that will
go smoothly.


### #11

I started working on more operators that would be useful. I started with the do
operator to handle side effects (which there are quite a few of in **Rampant.AI**).
That went fairly quickly... you can even scope the value of the callback
argument which will be super handy. On top of that I'm working on a log operator
so it is easier for me to throw log statements where I want. It accepts a logger
for testing purposes, but defaults to console.log. It should be useful when I
get through it. I want it to be able to log with a label in addition to being
able to scope the value. This by itself won't save any code in **Rampant.AI** but it
will still be useful. I'll get back to it after this break.


### #10

Found a teensy bitsy bug that I can't figure out how to quite fix yet. I assume
it has to do with the fact that I'm doing a reduce. But hopefully I'll figure it
out in the future. Until then I spent some simple time refactoring a bit and
adding a couple of tests. I really need to move on to actual functionality now.
lol... stop focusing on the perfect and start adding some awesome.


### #9

So the refactor for my **Rampant.AI** platform went smoothly. It took roughly 5
pomodoros (25 minute sessions) and a real time of about 3 hours. I refactored
away from **RxJS** and to **Transmutation** and promises where **Transmutation**
didn't have the feature set needed quite yet. The code base went from 320 lines
of code to 247 lines of code which is a 22.8125% decrease in code. Which is
HUGE. And it is much cleaner and easier to read. I can almost drop **lodash**
from that as a dependency as well and keep all my **lodash** functionality in
**Transmutation**. This session I spent time refactoring and enabled multiple
path extending. I'm going to work on features that will make **Rampant.AI**
cleaner. Probably starting with a side effect function as well as potentially an
`if` function and some logging helper functions. Which I've always wanted. Lots
of fun stuff that can be done. This is just the beginning of **Transmutation**.


### #8

I think it is useable now. I added the ability to send in a function in addition
to a primitive or a promise and if that function returns a primitive or a
promise or a transmutation, it just works. :) I think the next step is to test
it with Rampant.AI. I think I can substitute most of the code with it now...
very cleanly actually. AHHH!!! IT MIGHT BE THE MOMENT!!!


### #7

WOOT!!! I think I fixed it just as I wanted to. I've changed the merge rules
logic to make more sense of it. I put it in this commit message:

```
When extending an existing key the goal is to keep all data as close to
the same as possible... never losing data, but also never changing the
type of data. So if a string is being extended with a number, the
next function that is going to use that property could now break because
it is a different type. However if an array is being extend with a
number, then the next function is already expecting an array so
appending the number to the array should not break it by normal
javascript standards... since we don't enforce a single type in each
array. The reverse is not also true though... extending a number with an
array should return the number since the next function to use it will be
expecting a number.

Based on that set of thoughts. I've changed all of the merging rules and
it looks like it should work with deep extensions as well. Which is a
very good sign.
```

So I think the extend operator is solid right now using path and a promise or
primitive value property, which is awesome. The next thing to probably do is
look into how a use case that matches the Rampant.AI platform looks. If I want
to extend the base object with the result of a promise call, but use part of
that base object (not all of it) for that promise call... how do I do that
easily? Basically I need to be able to cleanly scope the base object to use for
that promise call. I'll have to determine what that API will look like next
session. For now though... I think I'm solid to push the next patch version of
**Transmutation**. YAY!!!


### #6

So I got the promise system to properly work and then what I realized is that
deep defaulting doesn't work properly since deepDefaults doesn't have the merge
behaviour that I'm looking for. For example if both objects have a key of test,
then one has a string and the other has an object, I want the string and object
to be merged as an array below the test key. Which is what my default behaviour
does at a high level, but not at a deep level so I have to figure out the best
way to get that working as expected. This could take me a bit of research.


### #5

I was blanking for a bit trying to add in paths and stuff for the extend
operator and then something just clicked which was SUPER nice. When I did that I
think I made things just work nicely. I have to look into edge cases now like
when I try to set a new key past a non-object value, but I think I covered most
cases with what I just did. I should really check promises next session to
ensure that I cover the main reason that I want this because I want to extend a
result from a promise into a backbone snowball object of data. So I'll try to
make sure that works next session if I get to it.


### #4

Finished up all the strange simple cases and now I'm working on simple object
extensions while keeping immutability. I got basic cases done and now I'm
factoring in paths which will be its own bit of fun. I also realized that it is
possible I'm not handling promises properly so I'll need to ensure that isn't a
problem as well. We shall see. Taking a bit of a brain break and then I'll jump
back into it. This is the most important operator when it is done. The core of
the library really. Of course the conditional extensions and branching and
parallel calls and stuff are important, but this is the bread and butter.


### #3

Finally found a bit of time to get one session in. Working on all the strange
edge cases for the extend operator before actually working on the object portion
that it was made to do. I think I can consolidate all of those if statements,
but perhaps I'm wrong. Anyway, before I check it in I need to go rename all of
the tests so they match the scenario they are doing. But there are 31 total
tests now and next session I'll clean that up and start working on the actual
reason the library exists, doing awesome extend stuff to grow an object without
mutating anything in the object.


### #2

Second round moving forward. Just making sure I catch as many edge cases as I
can with the early stage of the Extend operator. I have to remind myself
regularly the target DSL. So if I extend "5" with an array of "6" and "7", then
I tack that 5 to the beginning of the array. I also refactored out the operators
system so adding new operators will be easy. It is something I did in the
prototype and wanted to port over. I also made it so anyone can easily extend
Transmutation with their own operators. I'll demonstrate that in testing in the
future. I should add that as a todo item after this. So far so good and it is
nice to be in a system where I have testing setup again. And I forgot how fast
and clean it is working with tape. So much nicer and feels much leaner.


### #1

WOOT!!! This is my first session working on **Transmutation** which is awesome!
So a bit of background, I've been using RxJS and Lodash for a while now to do
some stream data processing with fun operators. I've gotten more acquianted to
the sort of functional style (I know it isn't pure functional, but whatever).
What I realized was that there were a lot of patterns that I did that ended up
being extremely verbose and clunky with RxJS. Extending the current object
wasn't as easy as it really should be. Deep accessing properties and objects
were a pain, etc. I used lodash as much as possible to easy the pain, it got
better and I am still very succinct in general for data processing, but I think
it can be better. So I started working on a quick script to play with and
discovered that I can strip away Observables which are a very heavy project and
instead work around Promises exclusively and natively. Why? Mainly cuz I work
with one asynchronous event at a time. The thing is Promises aren't powerful
like streams are. So I started looking into creating a simple API. And it worked
beautifully. So now I'm working on formalizing those little experiments into an
actual tested module.

There will be a lot of powerful things that will be able to be done with this
package. The fact that it treats values and promises as one in the same, will
handle parallelization easily, extending easily, etc. is great. But there is
more. I'm building off of a theory that I had that goes something like this:

```
You can't be self empowered to complete a task unless you have everything you
need to complete that task up front. Otherwise you are "coupled" and dependent
on something else and introduce context switching, waiting, and other
complications. If you have everything to begin with before you do things, then
you have full control over what you are doing.
```

This philosophy basically equates to the fact that you shouldn't be doing side
effects that change the world around you until you have every piece of data you
need. In addition to that, in tandem to that property I wanted to make sure that
every step at the end has access to every piece of data every prior step had
access to. This builds in a concept of immutability as you build up this data.
There should be a transition point where you collect data without modifying or
deleting data at all until you have everything you need. THEN and ONLY THEN can
you start committing side effects and trimming/removing data. This concept has
made a lot of work easier for me when working in the API space. So based on
these rules, I can build a library that is built to enforce this concept.
Preventing removal/modification of data already piled up until it is time to
work on side effects. That is what Transmutation is going to do. Not just be
succinct and powerful, but also enforce a powerful concept to make development
and maintenance easier. Following this paradigm future proofs enhancements as
every addition has access to every piece of data before it. A lot of
enhancements break systems because they have to be connected to data that was
collected somewhere else. Well this concept stops that.

Anyways, that is my initial introduction into this library. I'll write something
formal up top in the readme, but I'm looking to go quickly through this so I can
get back to my main project that started all of this. A project where I've been
trying to build an entire platform under 300 lines of code for the MVP. And this
will enable me to do just that while staying understandable. Onwards to a
break!!!

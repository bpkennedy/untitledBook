# modular writing

This project aims to make an easy way to publish fiction in a modular way.   The goal is a writing style that can be published as fast as possible and also with all the advantages of source code control.  A second goal is to explore the writing process as a more modular activity, much like programming.  Would it be possible for many authors to quickly collaborate on writing stories without a lot of admin tasks or confusion?  I hope something like this can be a solution.

Additionally, this project is using the pandoc extension to convert the markdown syntax into both html, .epub, and at some point .mobi formats as a one-size-fits-all publishing.

I also have published the novel to github webspace and setup my build process to push via terminal command.  I might automate this with Travis in the future, but manual suits me just fine for now.  The goal with this step is to quickly publish to the interwebs for a group project/effort or immediate reading/feedback from interested people.

# The workflow

It's pretty simple.  Say you're writing a book with chapters.  Create a structure of loose files in your ```src/chapters``` directory like so:
```
ch01.md
ch02.md
ch03.md
```
## Making files
You'll be creating a new file for each chapter you want to write, as small or long as you like.  You will write in [Markdown](https://help.github.com/articles/github-flavored-markdown/).  It's not hard to pickup. I mostly use the chapter heading (#) and nothing for the rest.  No need to mess around with margins, tabs, line-spacing, font style and/or color.  All of that will be handled modularly - as css style on the finished published .html file.  You just write something like:

```
#Awesome Chapter name

First paragraph of stuff here....

Second paragraph of stuff here....
```

## Saving your work
You can save the files in any text editor you like, I'm using Atom.  After saving locally, you'll want to commit your changes.  For this, I run some commands in my terminal.

First, let's build our project which will produce the distribution that we want to publish to the world ('dist' for short):
```
grunt compile
```

Now, let's save all our changes up to our github source code repo:

```
git add --all
git commit -m "some one line summary of your changes you are saving"
git push origin master
```

In that example I am pushing directly to master, but you can (and should) create branches and merge those branches into master.  Lastly, let's run the command to actually publish to our gh-pages branch in the repo:
```
grunt publish
```

The [book webspace](http://bpkennedy.github.io/untitledBook/) should take a minute or two to update with the new content.

# ePublishing

I'm using pandoc and some pre-arranged metadata in the ```src/epubResources``` path to build the chapters into an .epub file when the ```grunt compile``` command is run.

# Other things

So, I haven't really made this as a template to be reused in your own new repo just yet - although I think it's pretty much there.  I did a couple things for convenience in my repo here.

I added a repo commit history to the webspace page for readers to see exactly what changes are being commited/saved. The front-end of the gh-pages webpage is actually an angular app. This commit history widget is just a ```$http``` call to the github api to get the commit data for this repo.

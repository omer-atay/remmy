# Tasks

- [x] use tailwind
- [x] use wouter
- [x] use tanstack query
- [x] use font for logo

- [x] HomePage
- [x] PostPage
- [x] CommunityPage
- [x] UserPage (u/{user})
- [x] Sidebar
- [x] SearchPage
- [x] ImageViewer
- [x] Header
- [x] Footer
- [x] LoginPopup (use baseUI)
- [] LoggedUserPage (own page)
  - [] Up/DownvotedSection
  - [] SavedContentSection
  - [] RecentViewedSection
  - [] Followed/FriendsSection
    <!-- - [] PrivateMessageRoom -->
    <!-- - [] light/dark/system theme -->

---

# Stage-1

- [] if you can't do optimistic update, just use onSettled: () => queryClient.invalidateQueries() => this invalidates all the queries
- [x] look for client.getSite and use it
- [x] do not use Dropdown in myUserDetailsSection
- [] use mutation for upvote/downvote/comment etc.
  - [x] login/logout/signup
  - [x] upvote/downvote a post
  - [] add 'Join the conversation' section to postPage
  - [] upvote/downvote a comment
  - [] comment a post
  - [] comment a comment
  - [] join community

# Stage-2

- [] remove follow buttons from users & userdetailsection
- [] remove ThreeDot in header, comment, userpage, postcard, postpage?
- [] add Sign Up button in header
- [] add join button to post page and edit it
- [] sidebar collapse

# Stage-3

- [] research how to change the browser tab name when page changes (look specifically for react 19)
- [] general responsive
- [] handle dates, numbers => (https://polypane.app/blog/the-intl-api-the-best-browser-api-youre-not-using/#intlrelativetimeformat)
- [] handle post filter section option style (baseUI)

---

# ToDo

- [] open a google account

---

# Questions

- [] queries.ts review
- [] comment problem => http://localhost:5173/post/45030085
- [] Learn to use Wouter and Tanstack Query

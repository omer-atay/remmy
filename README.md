# Tasks

- [x] use tailwind
- [x] use wouter
- [x] use tanstack query
- [x] use font for logo

- [x] Responsive layout
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
- [x] use mutation for upvote, downvote, comment & join
  - [x] login/logout/signup
  - [x] upvote/downvote a post
  - [x] upvote/downvote a comment
  - [x] comment a post
  - [x] comment a comment
  - [x] join a community

---

# Won't Fix

- [] add SidebarMobile component
- [] add sidebar collapse
- [] handle signup
- [] add community details page in community page
- [] research how to change the browser tab name when page changes (look specifically for react 19)
- [] externalpostcardbody gets props => image, description?, link, body?
- [] handle new post bodies
  46132793 => application/pdf => give url and render something like external
  46131125 => text/plain => render something like external but also embed description and body
  45386767 => application/binary => same with text/plain but no description
  46199474 => audio/mpeg
  46141771 => application/json
  46213033 => text/plain;charset=utf-8

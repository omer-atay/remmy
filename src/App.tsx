import { Route, Switch } from 'wouter';
import { HomePage } from './components/HomePage/HomePage';
import { CommunityPage } from './components/CommunityPage/CommunityPage';
import { CreatorPage } from './components/CreatorPage/CreatorPage';
import { PostPage } from './components/PostPage/PostPage';
import { Header } from './components/Header/Header';
import { CommunitiesPage } from './components/CommunitiesPage/CommunitiesPage';
import { SearchPage } from './components/SearchPage/SearchPage';

export function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/communities" component={CommunitiesPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/c/:communityName">{(params) => <CommunityPage name={params.communityName} />}</Route>
          <Route path="/u/:userName">{(params) => <CreatorPage username={params.userName} />}</Route>
          <Route path="/post/:postId">{(params) => <PostPage id={params.postId} />}</Route>
        </Switch>
      </main>
    </>
  );
}

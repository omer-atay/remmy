import { Route, Switch } from 'wouter';
import { HomePage } from './components/HomePage/HomePage';
import { CommunityPage } from './components/CommunityPage/CommunityPage';

export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/c/:communityName" component={CommunityPage} />
      </Switch>
    </main>
  );
}

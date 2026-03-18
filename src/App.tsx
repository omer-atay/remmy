import { Route, Switch } from "wouter";
import { HomePage } from "./components/HomePage/HomePage";

export function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </main>
  );
}

import "../../styles/global.css";
import axios from "axios";

export default function App({ Component, pageProps }) {
  // let token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmIxMGZiOGFiZWU4NjIxMzAyZDQ0MDIiLCJmaXJzdE5hbWUiOiJOZ28iLCJsYXN0TmFtZSI6IkRhdCIsImVtYWlsIjoibXJkYXRuZ29AZ21haWwuY29tLnZuIiwiZXhwaXJlZCI6MTYwNzkwNDQwODE0MCwiaWF0IjoxNjA3ODc1NjA4LCJleHAiOjE2MDc5MDQ0MDh9.qyLYbosiovI_TwhMq6bzV8QafHLIlEGlJ9qUnFc08gc";
  // axios.defaults.headers.common.authorization = `Bearer ${token}`;
  return <Component {...pageProps} />;
}

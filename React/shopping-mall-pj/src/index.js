import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

// query-react 쓰기 위한 세팅 (실시간으로 데이터를 주고받아야할 때 유용한 라이브러리임!)
// 1. 위에서 import   2.QueryClient 인스턴스 생성  3. 적용할 App 태그를 QueryClientProvider로 감싸주고 client={queryClient 인스턴스} 속성 설정
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

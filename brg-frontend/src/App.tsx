import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StoreList from './components/StoreList';
import Login from './components/Login';
import Admin from './Admin';
import ProtectedRoute from './components/ProtectedRoute';
import StoreSearch from './components/StoreSearch';
import './styles/App.css';

function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container ${className || ''}`}>
      <div className="header">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="250"
            height="45.393"
            viewBox="0 0 66.146 12.01"
          >
            <image
              width="66.146"
              height="12.01"
              preserveAspectRatio="none"
              href="data:image/png;base64,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 UrY1Vv0/9vCXFhsV8qkAAAAASUVORK5CYII= "
              imageRendering="optimizeSpeed"
            />
          </svg>{' '}
          Arby's&nbsp;Locations
        </h1>
      </div>
      {children}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout className="home-container">
            <StoreSearch />
            <StoreList />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout className="page-container">
            <Login />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={
            <Layout className="page-container">
              <Admin />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

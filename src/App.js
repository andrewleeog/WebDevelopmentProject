import React, { useState } from 'react';
import './App.css';
import AddInstructor from './components/AddInstructor';
import AddClass from './components/addClass';
import AddPackage from './components/addPackage';
import AddCustomer from './components/addCustomer';
import ListView from './components/listView';

function App() {
  const [view, setView] = useState('instructor');

  return (
    <div className="App">
      <header className="App-header">
        <h1>YogiTrack</h1>
      </header>
      <nav>
        <button onClick={() => setView('instructor')}>Add Instructor</button>
        <button onClick={() => setView('class')}>Add Class</button>
        <button onClick={() => setView('package')}>Add Package</button>
        <button onClick={() => setView('customer')}>Add Customer</button>
        <button onClick={() => setView('list')}>View Records</button>
      </nav>
      <main>
        {view === 'instructor' && <AddInstructor />}
        {view === 'class' && <AddClass />}
        {view === 'package' && <AddPackage />}
        {view === 'customer' && <AddCustomer />}
        {view === 'list' && <ListView />}
      </main>
    </div>
  );
}

export default App;
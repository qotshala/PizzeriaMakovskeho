import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'qoti' && password === 'qoti') {
      localStorage.setItem('pizzeria_auth', 'true');
      navigate('/dashboard');
    } else {
      setError('Neplatné uživatelské jméno nebo heslo');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-gold w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold gold-accent mb-6 text-center italic">Přihlášení do administrace</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Uživatelské jméno</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-gold outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-1">Heslo</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-gold outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition uppercase tracking-widest"
          >
            Přihlásit se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

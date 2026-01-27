import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      router.push('/admin');
    } catch {
      setError('Email atau Password salah!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-2xl w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Admin</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <input 
          type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <input 
          type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700">
          Masuk
        </button>
      </form>
    </div>
  );
}
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSiteConfig } from '@/context/SiteConfigContext';

export const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const { config } = useSiteConfig();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {};

    if (!email.trim()) {
      errs.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Format email tidak valid';
    }

    if (!password) {
      errs.password = 'Password wajib diisi';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login gagal. Silakan periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cocoa-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Batik Motif Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="w-full max-w-md bg-ivory border border-gold/30 shadow-2xl p-8 relative z-10">
        {/* BRAND HEADER */}
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-maroon/10 text-maroon mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-cocoa">{config.brand_name}</h1>
          <p className="text-xs uppercase tracking-widest text-gold-dark font-semibold mt-1">
            Portal Administrator
          </p>
        </div>

        {/* ERROR SUMMARY ALERT */}
        {error && (
          <div className="mt-6 flex items-start gap-3 border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
              Email Administrator <span className="text-maroon">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cocoa/40">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@adhimasbatik.id"
                disabled={loading}
                className={`w-full pl-10 pr-3.5 py-2.5 bg-ivory border text-sm text-cocoa outline-none transition-colors ${
                  errors.email ? 'border-red-500 focus:border-red-600' : 'border-cocoa/20 focus:border-cocoa'
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-cocoa uppercase tracking-wider mb-1.5">
              Password <span className="text-maroon">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cocoa/40">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className={`w-full pl-10 pr-10 py-2.5 bg-ivory border text-sm text-cocoa outline-none transition-colors ${
                  errors.password ? 'border-red-500 focus:border-red-600' : 'border-cocoa/20 focus:border-cocoa'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cocoa/50 hover:text-cocoa"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-maroon px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ivory hover:bg-maroon-dark transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span>Memeriksa Kredensial...</span>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-cocoa/10 pt-4 text-center">
          <p className="text-[11px] text-cocoa/60 leading-relaxed">
            Gunakan akun administrator yang terdaftar untuk mengakses dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

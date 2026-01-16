import LoginForm from './LoginForm';
import { loginAction } from './actions/auth';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm loginAction={loginAction} />
    </div>
  );
}

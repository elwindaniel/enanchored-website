// app/create-password/page.tsx
import CreatePasswordForm from '@/components/forms/CreatePasswordForm';
import { Suspense } from 'react';

const CreatePasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePasswordForm />
    </Suspense>
  );
};

export default CreatePasswordPage;

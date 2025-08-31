import css from './ProfilePage.module.css';
import { getUserServer } from '@/lib/api/serverApi';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Profile Page',
  description: 'User profile details',
};

export default async function ProfilePage() {
  const user = await getUserServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username || 'No username'}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

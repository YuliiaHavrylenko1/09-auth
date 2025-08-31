// 'use client';

// import React from 'react';
// import css from './AuthNavigation.module.css';
// import { useAuthStore } from '../../lib/store/authStore';
// import { useRouter } from 'next/navigation';
// import { logoutUser } from '@/lib/api/clientApi'; // додано, бо викликається у handleLogout

// const AuthNavigation: React.FC = () => {
//   const { isAuthenticated, user, clearAuth } = useAuthStore();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       clearAuth();
//       router.push('/sign-in');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <ul>
//       {isAuthenticated ? (
//         <>
//           <li className={css.navigationItem}>
//             <a href="/profile" className={css.navigationLink}>
//               Profile
//             </a>
//           </li>
//           <li className={css.navigationItem}>
//             <p className={css.userEmail}>{user?.email}</p>
//             <button className={css.logoutButton} onClick={handleLogout}>
//               Logout
//             </button>
//           </li>
//         </>
//       ) : (
//         <>
//           <li className={css.navigationItem}>
//             <a href="/sign-in" className={css.navigationLink}>
//               Login
//             </a>
//           </li>
//           <li className={css.navigationItem}>
//             <a href="/sign-up" className={css.navigationLink}>
//               Register
//             </a>
//           </li>
//         </>
//       )}
//     </ul>
//   );
// };

// export default AuthNavigation;
'use client';

import React from 'react';
import css from './AuthNavigation.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/api/clientApi';

const AuthNavigation: React.FC = () => {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearAuth();
      router.push('/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ul>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <a href="/profile" className={css.navigationLink}>Profile</a>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <a href="/sign-in" className={css.navigationLink}>Login</a>
          </li>
          <li className={css.navigationItem}>
            <a href="/sign-up" className={css.navigationLink}>Register</a>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;

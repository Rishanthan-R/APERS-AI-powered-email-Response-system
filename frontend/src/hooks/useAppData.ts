import { useAuth } from '@/contexts/AuthContext';
import { useEmail } from '@/contexts/EmailContext';

export function useAppData() {
  const auth = useAuth();
  const email = useEmail();

  return {
    // Auth related
    user: auth.user,
    login: auth.login,
    logout: auth.logout,
    authLoading: auth.isLoading,

    // Email related
    emails: email.emails,
    currentEmail: email.currentEmail,
    inboxEmails: email.inboxEmails,
    draftEmails: email.draftEmails,
    aiRepliedEmails: email.aiRepliedEmails,
    needsReviewEmails: email.needsReviewEmails,
    setCurrentEmail: email.setCurrentEmail,
    markAsRead: email.markAsRead,
    deleteEmail: email.deleteEmail,
    moveToDrafts: email.moveToDrafts,
    sendEmail: email.sendEmail,
    emailLoading: email.isLoading,
  };
}
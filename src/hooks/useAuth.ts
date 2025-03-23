import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useGetProfileQuery } from "@/store/features/auth/authApi";

export const useAuth = () => {
  const { user, accessToken, isAuthenticated, isSurveyCompleted } = useSelector(
    (state: RootState) => state.user
  );

  const { isLoading: isLoadingProfile, refetch } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated || !!user,
  });

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading: isLoadingProfile,
    isSurveyCompleted,
  };
};

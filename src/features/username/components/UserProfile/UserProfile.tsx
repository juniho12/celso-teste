"use client";

import Image from "next/image";
import { GitHubUser } from "../../types/user";
import {
  ProfileContainer,
  ProfileHeader,
  Avatar,
  UserInfo,
  UserName,
  UserLogin,
  UserBio,
  StatsContainer,
  StatItem,
  StatValue,
  StatLabel,
  LocationText,
} from "./UserProfile.style";

interface UserProfileProps {
  user: GitHubUser;
  totalStars: number;
}

export function UserProfile({ user, totalStars }: UserProfileProps) {
  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar>
          <Image
            src={user.avatar_url}
            alt={user.login}
            width={120}
            height={120}
            priority
          />
        </Avatar>
        <UserInfo>
          <UserName>{user.name || user.login}</UserName>
          <UserLogin>@{user.login}</UserLogin>
          {user.bio && <UserBio>{user.bio}</UserBio>}
          {user.location && <LocationText>📍 {user.location}</LocationText>}
        </UserInfo>
      </ProfileHeader>

      <StatsContainer>
        <StatItem>
          <StatValue>{user.followers.toLocaleString()}</StatValue>
          <StatLabel>Followers</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{user.following.toLocaleString()}</StatValue>
          <StatLabel>Following</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{user.public_repos.toLocaleString()}</StatValue>
          <StatLabel>Repositories</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{totalStars.toLocaleString()}</StatValue>
          <StatLabel>Total Stars</StatLabel>
        </StatItem>
      </StatsContainer>
    </ProfileContainer>
  );
}

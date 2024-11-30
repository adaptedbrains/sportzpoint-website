'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WebStoryJson from '@/components/WebstoeyJson';

export default function WebStoryPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we have the story data in sessionStorage
    const storedStory = sessionStorage.getItem('currentWebStory');
    if (!storedStory) {
      // If no story data, redirect to home
      router.push('/');
    }
  }, [router]);

  return <WebStoryJson />;
}

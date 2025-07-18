'use client';
import ReviewModal from '@/components/reservationList/ReviewModal';

export default async function page() {
  return (
    <ReviewModal
      title='title'
      date='0000. 00. 00'
      startTime='12:00'
      endTime='13:30'
      headCount={30}
    />
  );
}

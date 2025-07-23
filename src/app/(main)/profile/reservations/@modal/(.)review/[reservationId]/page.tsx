import ReviewModal from '@/components/reservationList/ReviewModal';

type Props = {
  params: { reservationId: string };
};

export default async function page({ params }: Props) {
  const { reservationId } = params;
  console.log(reservationId);
  return (
    <>
      <ReviewModal
        title='title'
        date='0000. 00. 00'
        startTime='12:00'
        endTime='13:30'
        headCount={30}
      />
    </>
  );
}

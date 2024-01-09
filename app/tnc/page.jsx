import { tncData } from "@constants/tncData";

const TermsAndConditions = () => {
  return (
    <section className='mb-3 rounded-xl px-8 py-6 bg-foreground'>
      <h2 className='font-semibold text-lg'>NO REPAIR, NO CHARGE</h2>
      <div className='text-gray-800'>
        <p className='mt-2'>
          For commonly encountered issues like screen damage, camera malfunctions, or battery problems, our No Fix No Fee policy ensures that you won&apos;t incur any charges if we are unable to successfully repair your device.
        </p>
        <p className='mt-2'>
          In the case of more intricate repairs, such as those involving multiple device issues, water damage, or erratic behavior, our Repair Technician may need extensive time for diagnosis. For such scenarios, the technician will engage in a preliminary discussion with you before the repair visit. If necessary, a non-refundable fee may be agreed upon to compensate for the technician&apos;s time and travel expenses incurred during the diagnostic process. This fee becomes applicable only if the device cannot be effectively repaired.
        </p>
        <p className='mt-2'>
          If you choose not to accept the proposed fee, kindly inform your Repair Technician during the discussion, and your job will be canceled at no cost to you. In the event of proceeding with the booking but later deciding to cancel, please note that a cancellation fee may apply, as outlined in the CANCELLATION, RESCHEDULING, AND NO-SHOW section of our booking terms and conditions.
        </p>
      </div>
      {tncData.map((item) => (
        <div key={item.title}>
          <h2 className='font-semibold text-lg mt-4'>{item.title}</h2>
          <p className='text-gray-800'>{item.desc}</p>
        </div> 
      ))}
    </section>
  )
}

export default TermsAndConditions
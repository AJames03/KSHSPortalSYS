export const getBotReply = (message: string): string => {
  const msg = message.toLowerCase();

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return 'Hello! ano ang nais mong itanong ngayon?';
  } 
  // Mas specific: sino ang mag-enroll
  else if (msg.includes('who to enroll') || msg.includes('mag-enroll') || msg.includes('mag enroll')) {
    return 'Pumunta sa aming Home Website at pindutin ang Enroll Now, at piliin kung ikaw ay Regular Student o ALS Learner';
  } 
  else if (msg.includes('grades') || msg.includes('grade')) {
      return 'Kung nais mo malaman ang grades mo ay pumunta ka sa Enrollment Status.'
  }
  else if (msg.includes('requirements') || msg.includes('requirement')) {
    return `List:
1. PSA
2. Form 137`;
  }
  // General enrollment question
  else if (msg.includes('enroll') || msg.includes('enrollment')) {
    return `Ano ang nais mong malaman patungkol sa enrollment?`;
  } 
  else if (msg.includes('status')) {
    return 'Kung nais mong tignan ang iyong enrollment status maaari kang pumunta sa Enrollment Status, at ilagay ang hinihingi upang mabuksan mo ang iyong portal.';
  } 
  else {
    return `Paumanhin, ang impormasyong iyong hinahanap ay kasalukuyang hindi available sa aming sistema.
    Kung mayroon kang katanungan pwede kang makipag-ugnayan sa Admin o sa Registrar`;
  }
};

export default function getGreeting() {
    const hour = new Date().getHours();
  
    if (hour >= 5 && hour < 12) return 'Bonjour';
    if (hour >= 12 && hour < 18) return 'Bon après-midi';
    return 'Bonne soirée';
  }
  
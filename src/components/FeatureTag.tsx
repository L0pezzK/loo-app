import { Feature } from '@/data/bathrooms';
import { Accessibility, Coins, Baby, Users, Clock } from 'lucide-react';

interface FeatureTagProps {
  feature: Feature;
}

export default function FeatureTag({ feature }: FeatureTagProps) {
  let icon = null;
  let bgClass = 'bg-[#1e2a47]';
  let textClass = 'text-[#8a94a6]';

  switch (feature) {
    case 'Wheelchair Accessible':
      icon = <Accessibility className="w-3.5 h-3.5" />;
      bgClass = 'bg-blue-500/10';
      textClass = 'text-blue-400';
      break;
    case 'Free':
      icon = <Coins className="w-3.5 h-3.5" />;
      bgClass = 'bg-green-500/10';
      textClass = 'text-green-400';
      break;
    case 'Baby Changing':
      icon = <Baby className="w-3.5 h-3.5" />;
      bgClass = 'bg-purple-500/10';
      textClass = 'text-purple-400';
      break;
    case 'Gender Neutral':
      icon = <Users className="w-3.5 h-3.5" />;
      bgClass = 'bg-orange-500/10';
      textClass = 'text-orange-400';
      break;
    case '24/7':
      icon = <Clock className="w-3.5 h-3.5" />;
      bgClass = 'bg-cyan-500/10';
      textClass = 'text-cyan-400';
      break;
  }

  return (
    <div className={`px-2.5 py-1 rounded-full flex items-center space-x-1.5 text-xs font-medium border border-[#2A3655]/50 ${bgClass} ${textClass}`}>
      {icon}
      <span>{feature}</span>
    </div>
  );
}

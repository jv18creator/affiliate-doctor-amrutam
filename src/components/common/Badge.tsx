import React from 'react';

interface TBadge {
  content: string;
  status: 'warning' | 'success' | 'error';
}

const Badge = ({ content, status }: TBadge) => {
  const getStatus = () => {
    switch (status) {
      case 'warning':
        return `text-badge-warning-text bg-badge-warning-bg`;

      default:
        break;
    }
  };
  return (
    <span className={`text-[10px] p-1 rounded-md ${getStatus()}`}>
      {content}
    </span>
  );
};

export default Badge;

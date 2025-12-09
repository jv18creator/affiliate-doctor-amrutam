interface IconButtonProps {
  icon: string;
  label?: string;
  onClick?: () => void;
}

const IconButton = ({ icon, label, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center cursor-pointer justify-center w-9 h-9 rounded-xl bg-filled-field hover:bg-surface-primary-soft transition"
      aria-label={label}
    >
      <img src={icon} alt="" className="w-3.5 h-3.5" />
    </button>
  );
};

export default IconButton;

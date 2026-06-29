interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
  headingId?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className = '',
  headingId,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <header className={`mb-10 sm:mb-14 max-w-2xl ${alignClass} ${className}`}>
          <p className="label-section">{label}</p>
          <h2 id={headingId} className="heading-section mt-2 sm:mt-3">
            {title}
          </h2>
          {description ? <p className="text-body mt-3 sm:mt-4">{description}</p> : null}
    </header>
  );
}

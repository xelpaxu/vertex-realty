import { motion } from 'framer-motion';

interface Props {
  tag: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ tag, title, className = '' }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, amount: 0.1 }} 
      transition={{ duration: 0.6 }} 
      className={`mb-10 ${className}`}
    >
      <div className="text-[9px] tracking-[0.4em] uppercase text-gold font-semibold flex items-center gap-3 mb-5">
        <span className="w-6 h-px bg-gold"></span>{tag}
      </div>
      <h2 className="text-[clamp(32px,4vw,56px)] font-bold italic leading-[1.05] tracking-tight text-offwhite" dangerouslySetInnerHTML={{ __html: title }} />
    </motion.div>
  );
}
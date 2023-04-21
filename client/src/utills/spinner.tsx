export const Spinner: React.FC<{ className?: string }> = ({ className }) => {
  const styles = className ? { width: "100%", height: "100%" } : {};
  return (
    <div className={className} style={{ textAlign: "center" }}>
      <div style={styles} className="spinner"></div>
    </div>
  );
};

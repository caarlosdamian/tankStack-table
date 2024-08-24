export const SimpleComponent = ({ email }: { email: string }) => {
  return (
    <button style={{ padding: '4px', background: 'white', color: 'black' }}>
      {email}
    </button>
  );
};

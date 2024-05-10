import LikeButton from './like_button';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}
 
export default function HomePage() {
  const names = ['COM1', 'COM2', '/dev/usbserial_001'];
 
    return (
    <div>
      <Header title="Serial Port Explorer in Ghastly Serif Font" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
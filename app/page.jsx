import LikeButton from './like_button';
import SerPortList from './serport_list';
import Setup from './setup';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

 

export default function HomePage() {
    <Setup />
    const names = ['COM1', 'COM2', '/dev/usbserial_001'];
 
    return (
    <div>
      <Header title="Serial Port Explorer in Max Ghastly Serif Font" />
      <ul>
        <SerPortList />
      </ul>
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </div>
  );
}
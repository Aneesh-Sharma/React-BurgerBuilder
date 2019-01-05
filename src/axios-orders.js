import axios from 'axios';

const instance=axios.create({
	baseURL:'https://my-react-burger-b178d.firebaseio.com/'
});

export default instance;
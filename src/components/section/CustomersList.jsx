import { useEffect, useState } from "react";
import CustomerItem from '../elements/CustomerItem';
import CustomersDetails from '../elements/CustomersDetails';

function CustomersList(props) {
    const [list, setList] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        async function fetchData() {
            const reply = await fetch(process.env.REACT_APP_LIST_URL);
            if (!reply.ok) console.log(reply.statusText);
            const data = await reply.json();
            setList(data);
        }
        fetchData();
    }, []);

    const showDetails = (id) => {
        if (id === user) {
            setUser();
            return;
        }
        setUser(id);
    }
    return (
        <div className={'customers-info'}>
            <div className={'customers-list'}>
                {list.map(data =>
                    <div key={data.id}>
                        <CustomerItem
                            data={data}
                            onClick={showDetails}
                            active={user}
                        />
                    </div>
                )}
            </div>
            <div className={'customers-details'}>
                <CustomersDetails id={user} />
            </div>
        </div>
    )
}

export default CustomersList;

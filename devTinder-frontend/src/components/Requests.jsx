import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addRequest } from '../utils/requestSlice';

import { BASE_URL } from '../utils/constants';

const Requests = () => {
    const requests = useSelector((store) => store.requests); 
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try{
            const res = await axios.post(BASE_URL +"/request/review/"+ status+ "/"+_id,{},{withCredentials:true});

        }
        catch(err){
            console.log(err)
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
            dispatch(addRequest(res.data.data));
        } catch (err) {
            console.error("Error fetching requests:", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return <h1>Loading...</h1>;
    if (requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests Found</h1>;

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-white text-3xl">Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;

                return (
                    <div key={_id} className="flex justify-between items-center mx-auto p-4 border rounded-lg bg-base-300 w-2/3">
                        <div>
                            <img
                                className="w-20 h-20 rounded-full mx-14"
                                src={photoUrl || "https://via.placeholder.com/150"} 
                                alt={`${firstName} ${lastName}`}
                            />
                        </div>
                        <div className="text-left mx-4">
                            <h2 className="font-bold text-xl">{`${firstName} ${lastName}`}</h2>
                            <p>{about || "No additional information provided."}</p>
                            {age && gender && <p>{`${age} ${gender}`}</p>}
                        </div>
                        <div>
                            <button className="btn btn-primary mx-2"onClick={()=>reviewRequest("rejected",request._id)}>Reject</button>
                        <button className="btn btn-secondary mx-2" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button></div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;

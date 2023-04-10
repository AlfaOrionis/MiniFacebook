import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { User } from "../../types/types";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams<{ _id: string }>();
  useEffect(() => {
    axios
      .get("/api/users/profile?_id=" + params._id)
      .then((res: AxiosResponse<User>) => {
        setUser(res.data);
        if (user) console.log(user.user.firstname);
      })
      .catch((err) => console.log(err));
  }, []);

  if (user) {
    return (
      <div>
        {params._id}
        {user?.user.firstname}
      </div>
    );
  } else return <div>This content isn't available at the moment</div>;
};

export default Profile;

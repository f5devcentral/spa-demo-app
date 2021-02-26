# 3 Tier Demo App
This application demos a modern 3-tier application build on:
- Vue.js (front-end)
- Node.js (back-end)
- MongoDB (database)

![Demo Footwear Site](./demo_footwear.png)

# Deploy 
```bash
docker-compose up -d
```

# Development 
## back-end
```bash
export API_URL="http://localhost:8000"
npm run dev
```

## front-end
```bash
npm run serve
```

# Attribution
This code is based on the work of [Shaun Wassell](https://www.linkedin.com/in/shaun-wassell?trk=lil_course&lipi=urn%3Ali%3Apage%3Ad_learning_content%3BEJRJvvk4SzmhYz%2Bf1ZJBUw%3D%3D&licu=urn%3Ali%3Acontrol%3Ad_learning_content-view_on_linkedin) and his [Creating and Hosting a Full-Stack Site LinkedIn Learning course](https://www.linkedin.com/learning/vue-js-creating-and-hosting-a-full-stack-site/).

I have extended his demo to:
- run components in docker containers
- abstract API and image URLs 
- seed MongoDB 
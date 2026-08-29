# ShopKart - Kubernetes Two-Tier Project

Browser -> React Frontend -> Node.js/Express Backend API

Kubernetes concepts: Deployments, replicas, Services/NodePort, ConfigMap, Secret, health probes, resource requests/limits, Docker Hub images. No Ingress and no database.

## Build and push
Replace YOUR_DOCKERHUB_USERNAME with your Docker Hub username.

Backend:
docker build -t YOUR_DOCKERHUB_USERNAME/shopkart-backend:1.0 ./backend
docker push YOUR_DOCKERHUB_USERNAME/shopkart-backend:1.0

Frontend:
docker build --build-arg VITE_API_URL=http://localhost:30500 -t YOUR_DOCKERHUB_USERNAME/shopkart-frontend:1.0 ./frontend
docker push YOUR_DOCKERHUB_USERNAME/shopkart-frontend:1.0

## Kubernetes
Replace the username in k8s/03-backend-deployment.yaml and k8s/06-frontend-deployment.yaml, then:

kubectl apply -f k8s/
kubectl get deployments
kubectl get pods
kubectl get services

Frontend NodePort: 30080
Backend NodePort: 30500

For an existing KIND cluster that does not expose NodePorts to the host, use:
kubectl port-forward service/shopkart-frontend 8080:80
Then open http://localhost:8080.

The backend is NodePort here intentionally so students can test the REST API directly. In a more production-like design it would usually be ClusterIP and remain internal, but Ingress is deliberately excluded because it has not been taught yet.

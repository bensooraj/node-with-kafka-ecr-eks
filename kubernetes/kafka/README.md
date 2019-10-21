```sh
cd ~/eks-kafka-strimzi
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get > get_helm.sh
chmod +x get_helm.sh
./get_helm.sh
helm init --service-account=tiller
helm repo add strimzi http://strimzi.io/charts/
helm install strimzi/strimzi-kafka-operator
```
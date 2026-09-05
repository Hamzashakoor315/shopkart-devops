pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USERNAME    = 'hamzashakoor315'
        BACKEND_IMAGE         = "${DOCKERHUB_USERNAME}/shopkart-backend"
        FRONTEND_IMAGE        = "${DOCKERHUB_USERNAME}/shopkart-frontend"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./backend"
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./frontend"
            }
        }

        stage('Docker Hub Login') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                '''
            }
        }

        stage('Push Backend Image') {
            steps {
                sh "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
            }
        }

        stage('Push Frontend Image') {
            steps {
                sh "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'PLACEHOLDER: Kubernetes deployment will be configured separately after this Docker build/push pipeline is verified.'
                // TODO: kubectl apply -f k8s/ (with image tag updated to ${BUILD_NUMBER})
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        success {
            echo "SUCCESS: Build #${BUILD_NUMBER} completed. Pushed images:\n- ${BACKEND_IMAGE}:${BUILD_NUMBER}\n- ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
        }
        failure {
            echo "FAILURE: Build #${BUILD_NUMBER} failed. Check the stage logs above for details."
        }
    }
}

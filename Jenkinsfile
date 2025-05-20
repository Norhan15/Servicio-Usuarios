pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EC2_USER = 'ubuntu'
        SSH_KEY = credentials('ssh-key-ec2')
        DB_URL = credentials('mongo-db-url')
        SECRET_KEY = credentials('secret-key')
        DEV_IP = '34.195.61.104'
        QA_IP  = '34.235.227.136'
        PROD_IP = '52.5.205.88'
        REMOTE_PATH = '/home/ubuntu/Servicio-Usuarios'
    }

    stages {
        stage('Detect Branch') {
            steps {
                script {
                    env.ACTUAL_BRANCH = env.GIT_BRANCH?.replaceFirst(/^origin\//, '') ?: 'main'
                    echo "🔍 Rama activa: ${env.ACTUAL_BRANCH}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def ip = env.ACTUAL_BRANCH == 'dev' ? DEV_IP :
                             env.ACTUAL_BRANCH == 'qa'      ? QA_IP :
                             env.ACTUAL_BRANCH == 'main'    ? PROD_IP : null

                    def pm2_name = "${env.ACTUAL_BRANCH}-health"

                    if (ip == null) {
                        error "Branch ${env.ACTUAL_BRANCH} no está configurada para despliegue."
                    }

                    sh """
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$ip '
                        echo "📦 Actualizando sistema..."
                        sudo apt-get update -y &&
                        sudo apt-get upgrade -y

                        echo "📥 Verificando Node.js..."
                        if ! command -v node > /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi

                        echo "📥 Verificando PM2..."
                        if ! command -v pm2 > /dev/null; then
                            sudo npm install -g pm2
                        fi

                        echo "📁 Verificando carpeta de app..."
                        if [ ! -d "$REMOTE_PATH/.git" ]; then
                            git clone https://github.com/Norhan15/Servicio-Usuarios.git $REMOTE_PATH
                        fi

                        echo "Creado credenciales .env..."
                        if [ ! -f "$REMOTE_PATH/.env" ]; then
                            echo "URL_DB=$DB_URL" > $REMOTE_PATH/.env
                            echo "SECRET_JWT=$SECRET_KEY" >> $REMOTE_PATH/.env
                        fi

                        echo "🔁 Pull y deploy..."
                        cd $REMOTE_PATH &&
                        git pull origin ${env.ACTUAL_BRANCH} &&
                        npm ci &&
                        pm2 restart ${pm2_name} || pm2 start app.js --name ${pm2_name}
                    '
                    """
                }
            }
        }
    }
}
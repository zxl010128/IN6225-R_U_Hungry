if [ $# -lt 1 ]; then
    echo "Please enter the backend port and frontend port"
    echo "Format: sh run.sh [backendPortNumber] [frontendPortNumber]"
else
    echo "REACT_APP_BACKEND_PORT=$1" > .env
    echo "REACT_APP_FRONTEND_PORT=$2" >> .env
    if [ x"$2" = x ]; then 
        npm start 
    else 
        PORT=$2 npm start
    fi
fi
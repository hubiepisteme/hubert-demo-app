node {
    agent any 
    stages {
	stage('test'){
	    step {
		echo " Stage: test "
		echo " Step: npm test" 
		echo "Hello world without sh"
		sh 'echo "Hello World sh"'
		sh 'npm --version'
		sh 'npm test'
	    }
	}
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}

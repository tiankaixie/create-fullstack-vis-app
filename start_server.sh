 #!/bin/bash
{ npm start --prefix gui & gunicorn server.server:app -c server/gunicorn.conf.py; } > STDOUT_file 2> STDERR_file
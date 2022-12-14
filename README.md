#### Telemetry Collector Server (TypeScript) (WIP)

It is one of the three applications on which will be carried out performance tests in order to determine which are the most performing technologies. This is the TypeScript version. 

<p align="center" width="100%">
    <img width="50%" src="dev-stack1.png"> 
</p>
Technology stack: Typescript, Express, TypeORM, Postgres

See also:

- [oh_telemetry_collector_load_test](https://github.com/goto-eof/oh_telemetry_collector_load_test)
- [oh_telemetry_collector_server_java](https://github.com/goto-eof/oh_telemetry_collector_server_java)
- [oh_telemetry_collector_server_rust](https://github.com/goto-eof/oh_telemetry_collector_server_rust)
- [oh_telemetry_collector_server_ts](https://github.com/goto-eof/oh_telemetry_collector_server_ts)

### Run 

```bash
docker-compose up
```

### Run only DBMS

```bash
docker-compose -f docker-compose-dbms.yml up
```

### Use postman collection for making requests

Import postman.json

### The server responds on

```
http://localhost:8019/collect
```


### DB connection

```
postgres://127.0.0.1:5439/postgres
username: postgres
password: postgres
```
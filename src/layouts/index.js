function BasicLayout(props) {
  return (
    <div>
      <div style={{textAlign:'center', height: '50px', backgroundColor: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        CRUD DEMO
      </div>
      <div style={{margin: '10px', padding: '10px', border: '1px dashed #ddd'}}>
        {props.children}
      </div>
    </div>
  );
}

export default BasicLayout;

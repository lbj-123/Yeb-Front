<template>
  <div>
       <div style="display: flex;justify-content: space-between">
          <div>
            <el-input style="width: 300px;margin-right: 10px" prefix-icon="el-icon-search"
                      v-model="empName"
                      @keydown.enter.native="initEmps"
                      clearable
                      @clear="initEmps"
                      placeholder="请输入员工名进行搜索..."></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="primary">
              <i class="fa fa-angle-double-down" aria-hidden="true"></i> 高级搜索</el-button>
          </div>
          <div>
            <el-button type="success">
              <i class="fa fa-level-up" aria-hidden="true"></i>导入数据</el-button>
            <el-button type="success">
              <i class="fa fa-level-down" aria-hidden="true"></i>导出数据</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>
          </div>
       </div>
       <div>
          <el-table
              :data="emps"
              stripe
              border
              style="width: 100%">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
               prop="name"
               label="姓名"
               fixed
               align="left"
               width="90">
            </el-table-column>
            <el-table-column
               prop="workID"
               label="工号"
               align="left"
               width="85">
            </el-table-column>
            <el-table-column
               prop="gender"
               label="性别"
               width="50">
            </el-table-column>
            <el-table-column
               prop="birthday"
               label="出生日期"
               align="left"
               width="95">
            </el-table-column>
            <el-table-column
                prop="idCard"
                label="身份证号码"
                align="left"
                width="150">
            </el-table-column>
            <el-table-column
                prop="wedlock"
                label="婚姻状况"
                width="70">
            </el-table-column>
            <el-table-column
                prop="nation.name"
                label="民族"
                width="50">
            </el-table-column>
            <el-table-column
                prop="nativePlace"
                label="籍贯"
                width="80">
            </el-table-column>
            <el-table-column
                prop="politicsStatus.name"
                label="政治面貌"
                width="100">
            </el-table-column>
            <el-table-column
                prop="email"
                label="电子邮件"
                align="left"
                width="180">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话号码"
                align="left"
                width="100">
            </el-table-column>
            <el-table-column
                prop="address"
                label="联系地址"
                align="left"
                width="220">
            </el-table-column>
            <el-table-column
                prop="department.name"
                label="所属部门"
                align="left"
                width="100">
            </el-table-column>
            <el-table-column
                prop="joblevel.name"
                label="职称"
                width="100">
            </el-table-column>
            <el-table-column
                prop="position.name"
                label="职位"
                width="100">
            </el-table-column>
            <el-table-column
                prop="engageForm"
                label="聘用形式"
                align="left"
                width="100">
            </el-table-column>
            <el-table-column
                prop="tiptopDegree"
                label="最高学历"
                width="80">
            </el-table-column>
            <el-table-column
                prop="school"
                label="毕业学校"
                align="left"
                width="150">
            </el-table-column>
            <el-table-column
                prop="workState"
                label="在职状态"
                align="left"
                width="70">
            </el-table-column>
            <el-table-column
                prop="beginDate"
                label="入职日期"
                align="left"
                width="95">
            </el-table-column>
            <el-table-column
                prop="coversionTime"
                label="转正日期"
                align="left"
                width="95">
            </el-table-column>
            <el-table-column
                prop="beginContract"
                label="合同起始日期"
                align="left"
                width="95">
            </el-table-column>
            <el-table-column
                prop="endContract"
                label="合同截至日期"
                align="left"
                width="95">
            </el-table-column>
            <el-table-column
                label="合同期限"
                align="left"
                width="100">
              <template slot-scope="scope">
                <el-tag>{{scope.row.contractTerm}}</el-tag>年
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                fixed="right"
                width="200">
              <template slot-scope="scope">
                  <el-button style="padding: 3px" size="mini">编辑</el-button>
                  <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                  <el-button style="padding: 3px" size="mini" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: flex-end">
            <el-pagination
                background
                @current-change="currentChange"
                @size-change="sizeChange"
                layout="sizes,prev, pager, next, jumper, ->, total"
                :total="total">
            </el-pagination>
          </div>
       </div>
        <el-dialog
            title="添加员工"
            :visible.sync="dialogVisible"
            width="80%">
          <div>
            <el-form ref="empForm" :model="emp" :rules="rules">
                <el-row>
                    <el-col :span="6">
                      <el-form-item label="姓名：" prop="name">
                        <el-input size="mini" style="width: 150px;"prefix-icon="el-icon-edit"
                                  v-model="emp.name" placeholder="请输入员工姓名"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="性别：" prop="gender" >
                        <el-radio-group v-model="emp.gender"style="margin-top: 8px">
                          <el-radio  label="男">男</el-radio>
                          <el-radio  label="女">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="出生日期：" prop="birthday">
                        <el-date-picker
                            v-model="emp.birthday"
                            type="date"
                            size="mini"
                            style="width: 150px"
                            value-format="yyyy-MM-dd"
                            placeholder="出生日期">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="政治面貌：" prop="politicId">
                        <el-select v-model="emp.politicId" size="mini" style="width: 200px" placeholder="政治面貌">
                            <el-option
                                v-for="item in politicsstatus"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="民族：" prop="nationId">
                          <el-select v-model="emp.nationId" size="mini" style="width: 150px" placeholder="民族">
                              <el-option
                                  v-for="item in nations"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                              </el-option>
                          </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                       <el-form-item label="籍贯：" prop="nativePlace">
                            <el-input v-model="emp.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit"
                                      size="mini" style="width: 120px"></el-input>
                       </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="电子邮箱：" prop="email">
                           <el-input v-model="emp.email" prefix-icon="el-icon-message"
                                     placeholder="请输入电子邮箱" size="mini" style="width: 150px"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="联系地址：" prop="address">
                           <el-input v-model="emp.assign" placeholder="请输入联系地址" size="mini"
                                     style="width: 200px" prefix-icon="el-icon-edit"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                      <el-form-item label="职位：" prop="posId">
                          <el-select v-model="emp.posId" size="mini" style="width: 150px" placeholder="职位">
                            <el-option
                                v-for="item in positions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="职称：" prop="jobLevelId">
                          <el-select v-model="emp.jobLevelId" size="mini" style="width: 150px" placeholder="职称">
                            <el-option
                                v-for="item in joblevels"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="所属部门：" prop="departmentId">
                        <el-popover
                            placement="bottom"
                            title="请选择部门"
                            width="200"
                            trigger="manual"
                            v-model="visible">
                          <el-tree
                              :data="allDeps"
                              :props="defaultProps"
                              default-expand-all
                              @node-click="handleNodeClick">
                          </el-tree>
                          <div slot="reference" style="width: 150px;display: inline-flex;border: 1px solid #dedede;
                            height: 28px;border-radius: 5px;cursor: pointer;align-items: center;
                            font-size: 13px;padding-left: 8px;box-sizing: border-box" @click="showDepView">{{inputDepName}}
                          </div>
                        </el-popover>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                       <el-form-item label="电话号码：" prop="phone">
                         <el-input v-model="emp.phone" placeholder="请输入电话号码" size="mini"
                                   style="width: 200px" prefix-icon="el-icon-phone"></el-input>
                       </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                      <el-form-item label="工号：" prop="workID">
                         <el-input v-model="emp.workID" placeholder="请输入工号" prefix-icon="el-icon-edit" disabled
                                   size="mini" style="width: 150px"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="学历：" prop="tiptopDegree">
                          <el-select v-model="emp.tiptopDegree" size="mini" style="width: 150px" placeholder="学历">
                            <el-option
                                v-for="item in tiptopDegrees"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                          </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="毕业学校：" prop="school">
                         <el-input v-model="emp.school" size="mini" placeholder="请输入毕业院校"
                                   prefix-icon="el-icon-edit" style="width: 150px"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                      <el-form-item label="入职日期：" prop="beginDate">
                          <el-date-picker
                              v-model="emp.beginDate"
                              type="date"
                              size="mini"
                              style="width: 125px"
                              value-format="yyyy-MM-dd"
                              placeholder="入职日期">
                          </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="转正日期：" prop="conversionTime">
                          <el-date-picker
                              v-model="emp.conversionTime"
                              type="date"
                              size="mini"
                              style="width: 125px"
                              value-format="yyyy-MM-dd"
                              placeholder="转正日期">
                          </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同起始日期：" prop="beginContract">
                          <el-date-picker
                              v-model="emp.beginContract"
                              type="date"
                              size="mini"
                              style="width: 140px"
                              value-format="yyyy-MM-dd"
                              placeholder="合同起始日期">
                          </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="合同截至日期：" prop="endContract">
                          <el-date-picker
                              v-model="emp.endContract"
                              type="date"
                              size="mini"
                              style="width: 170px"
                              value-format="yyyy-MM-dd"
                              placeholder="合同截至日期">
                          </el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                      <el-form-item label="身份证号码：" prop="idCard">
                         <el-input v-model="emp.idCard" placeholder="请输入身份证号码" size="mini"
                                   prefix-icon="el-icon-edit" style="width: 150px"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="聘用形式：" prop="engageForm">
                          <el-radio-group v-model="emp.engageForm" style="margin-top: 8px">
                            <el-radio  label="劳动合同">劳动合同</el-radio>
                            <el-radio  label="劳务合同">劳务合同</el-radio>
                          </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="婚姻状况：" prop="wedlock">
                        <el-radio-group v-model="emp.wedlock" style="margin-top: 8px">
                          <el-radio  label="已婚">已婚</el-radio>
                          <el-radio  label="未婚">未婚</el-radio>
                          <el-radio  label="离异">离异</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddEmp">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
     export default {
         name: "EmpBasic",
         data(){
             return{
                defaultProps:{
                  children: 'children',
                  label: 'name'
                },
                inputDepName:'',
                allDeps:[],
                visible:false,
                emps:[],
                total:0,
                currentPage:1,
                size:10,
                empName:'',
                dialogVisible:false,
                nations:[],
                joblevels:[],
                politicsstatus:[],
                positions:[],
                tiptopDegrees: ['博士','硕士','本科','大专','高中','初中','小学','其他'],
                emp:{
                  name: '',
                  gender: '',
                  birthday: '',
                  idCard: '',
                  wedlock: '',
                  nationId: null,
                  nativePlace: '',
                  politicId: null,
                  email: '',
                  departmentId: null,
                  jobLevelId: null,
                  engageForm: '',
                  tiptopDegree: '',
                  school:'',
                  workID: null,
                  contractTerm: null,
                  workAge: '',
                  salaryId: '',
                  conversionTime: '',
                  notWorkDate: '',
                  beginContract: '',
                  endContract: '',
                  beginDate: '',
                  posId: null,
                  phone: '',
                  address: '',
                  workState: '在职'
                },
               rules:{
                 name: [{required:true,message:'请输入员工姓名',trigger:'blur'}],
                 gender: [{required:true,message:'请输入员工性别',trigger:'blur'}],
                 birthday: [{required:true,message:'请输入出生日期',trigger:'blur'}],
                 idCard: [{required:true,message:'请输入身份证号码',trigger:'blur'},
                        {pattern:/(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$)/
                          ,message:'身份证号码不正确',trigger:'blur'}],
                 wedlock: [{required:true,message:'请输入婚姻状况',trigger:'blur'}],
                 nationId: [{required:true,message:'请输入民族',trigger:'blur'}],
                 nativePlace: [{required:true,message:'请输入籍贯',trigger:'blur'}],
                 politicId: [{required:true,message:'请输入政治面貌',trigger:'blur'}],
                 email: [{required:true,message:'请输入邮箱',trigger:'blur'},
                        {type:'email',message:'邮箱格式不正确',trigger:'blur'}],
                 phone: [{required:true,message:'请输入联系电话',trigger:'blur'}],
                 address: [{required:true,message:'请输入员工地址',trigger:'blur'}],
                 departmentId: [{required:true,message:'请输入部门地址',trigger:'blur'}],
                 jobLevelId: [{required:true,message:'请输入职称',trigger:'blur'}],
                 posId: [{required:true,message:'请输入职位',trigger:'blur'}],
                 engageForm: [{required:true,message:'请输入聘用形式',trigger:'blur'}],
                 tiptopDegree: [{required:true,message:'请输入学历',trigger:'blur'}],
                 school: [{required:true,message:'请输入毕业院校',trigger:'blur'}],
                 beginDate: [{required:true,message:'请输入入职日期',trigger:'blur'}],
                 workState: [{required:true,message:'请输入工作状态',trigger:'blur'}],
                 workID: [{required:true,message:'请输入工号',trigger:'blur'}],
                 conversionTime: [{required:true,message:'请输入转正日期',trigger:'blur'}],
                 contractTerm: [{required:true,message:'请输入合同期限',trigger:'blur'}],
                 notWorkDate: [{required:true,message:'请输入离职日期',trigger:'blur'}],
                 beginContract: [{required:true,message:'请输入合同起始日期',trigger:'blur'}],
                 endContract: [{required:true,message:'请输入合同结束日期',trigger:'blur'}],
                 workAge: [{required:true,message:'请输入工龄',trigger:'blur'}],
               }
             }
         },
         mounted() {
           this.initEmps();
           this.initData();
         },
       methods:{
              doAddEmp(){
                this.$refs['empForm'].validate(valid=>{
                  if(valid){
                    this.postRequest('/employee/basic/',this.emp).then(resp=>{
                      if(resp){
                        this.dialogVisible=false;
                        this.initEmps();
                      }
                    })
                  }
                })
              },
              handleNodeClick(data){
                 this.inputDepName=data.name;
                 this.emp.departmentId=data.id;
                 this.visible=!this.visible;
              },
              showDepView(){
                this.visible=!this.visible;
              },
              getMaxWorkID(){
                this.getRequest('/employee/basic/maxWorkID').then(resp=>{
                  if(resp){
                    this.emp.workID=resp.obj;
                  }
                })
              },
              initPositions() {
                this.getRequest('/employee/basic/positions').then(resp=>{
                  if(resp){
                    this.positions=resp;
                  }
                })
              },
              initData(){
                if(!window.sessionStorage.getItem('nations')){
                  this.getRequest('/employee/basic/nations').then(resp=>{
                    if(resp){
                      this.nations=resp;
                      window.sessionStorage.setItem('nations',JSON.stringify(resp))
                    }
                  })
                }else {
                  this.nations=JSON.parse(window.sessionStorage.getItem('nations'));
                }
                if(!window.sessionStorage.getItem('joblevels')){
                  this.getRequest('/employee/basic/joblevels').then(resp=>{
                    if(resp){
                      this.joblevels=resp;
                      window.sessionStorage.setItem('joblevels',JSON.stringify(resp))
                    }
                  })
                }else {
                  this.joblevels=JSON.parse(window.sessionStorage.getItem('joblevels'));
                }
                if(!window.sessionStorage.getItem('politicsstatus')){
                  this.getRequest('/employee/basic/politicsstatus').then(resp=>{
                    if(resp){
                      this.politicsstatus=resp;
                      window.sessionStorage.setItem('politicsstatus',JSON.stringify(resp))
                    }
                  })
                }else {
                  this.politicsstatus=JSON.parse(window.sessionStorage.getItem('politicsstatus'));
                }
                if(!window.sessionStorage.getItem('allDeps')){
                  this.getRequest('/employee/basic/deps').then(resp=>{
                    if(resp){
                      this.allDeps=resp;
                      window.sessionStorage.setItem('allDeps',JSON.stringify(resp))
                    }
                  })
                }else {
                  this.allDeps=JSON.parse(window.sessionStorage.getItem('allDeps'));
                }
              },
              sizeChange(size){
                this.size=size;
                this.initEmps();
              },
              currentChange(currentPage){
                    this.currentPage=currentPage;
                    this.initEmps();
              },
              showAddEmpView(){
                 this.getMaxWorkID();
                 this.initPositions();
                 this.dialogVisible=true;
              },
              initEmps(){
                 this.getRequest('/employee/basic/?currentPage='+this.currentPage+'&size='+this.size+'&name='+this.empName).then(resp=>{
                     if(resp){
                         this.emps=resp.data;
                         this.total=resp.total;
                     }
                 })
              }
         }
}
</script>

<style scoped>

</style>
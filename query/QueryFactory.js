


module.export = {

    /**
     *
     * @param fields : array<object> join 사용시 as 까지 포함 {column : 컬럼, as : 별칭}
     * @param table : string 조회할 테이블, join 사용시 as 까지 포함
     * @param where : array<object> 검색 조건 and 연산 {target : 검색 대상, type = equal or like, not = 포함여부, condition = '조건값'}
     * @param join : array<object> {tableName = 대상 테이블, on = 조건절, type = left,right,inner,outer}
     * @param order : array<string>
     * @param limit : number
     * @param offset : number
     * @returns {string|null}
     */
    select : function (fields, table, where, join, order = ['id desc'], limit = 10, offset = 0) {
        if (!table) {
            return null;
        }

        let query = 'select';

        //컬럼
        let selectColumns = '';
        if (!fields) {selectColumns = ' *'}
        else {
            for (const field in fields) {
                selectColumns += ` ${field.column}`;
                if(field.as) selectColumns += ` ${field.as}`
             }
        }



        let flag = false;

        let whereClause = '';

    }
}